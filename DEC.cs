using Bridge;
using Bridge.Html5;
using System;
using System.Collections.Generic;

[assembly:Reflectable]
namespace ClassLibrary1
{
	public class Class1
	{
		[Ready]
		public static void Main()
		{
			var t = new T
			{
				x = 1,
				y = 2,
				z = 3,
				bla = new U
				{
					a = 4,
					b = 5,
					c = 6, 
					d = true
				}
			};

			var json = JsonSerialiser.Serialise(t);
			var obj = JsonSerialiser.Deserialise<T>(json);

			Console.WriteLine(obj.bla.a);
		}
	}

	sealed class JsonSerialiser
	{
		public static string Serialise(object source)
		{
			Func<object, object> serialiser = null;
			serialiser = (obj) =>
			{
				var type = obj.GetType();

				if (source == null)
					return null;
				else if (type == typeof(short))
					return obj;
				else if (type == typeof(int))
					return obj;
				else if (type == typeof(long))
					return obj;
				else if (type == typeof(double))
					return obj;
				else if (type == typeof(float))
					return obj;
				else if (type == typeof(decimal))
					return obj;
				else if (type == typeof(bool))
					return obj;
				else if (type == typeof(String))
					return obj;
				else
				{
					var json = Script.Write<string>("{ $$serType: {0} }", type.FullName);
					var properties = type.GetProperties();

					for (var i = 0; i < properties.Length; i++)
					{
						var property = properties[i];
						var propertyName = property.Name;
						var value = type.GetProperty(propertyName).GetValue(obj, null);
						var serialisedProp = serialiser(value);
						Script.Write("json[propertyName] = serialisedProp");
					}

					var fields = type.GetFields();

					for (var i = 0; i < fields.Length; i++)
					{
						var field = fields[i];
						var fieldName = field.Name;
						var value = type.GetField(fieldName).GetValue(obj);
						var serialisedField = serialiser(value);
						Script.Write("json[fieldName] = serialisedField");
					}

					return json;
				}
			};

			return JSON.Stringify(serialiser(source));
		}

		public static T Deserialise<T>(string source)
		{
			var baseObject = JSON.Parse<object>(source);
			var ignorePropertyNames = new HashSet<string> { "$$serType", "__proto__" };

			Func<object, object> deserialiser = null;
			deserialiser = (obj) =>
			{
				if (obj == null)
					return null;
				else if (obj is short)
					return obj.As<short>();
				else if (obj is int)
					return obj.As<int>();
				else if (obj is long)
					return obj.As<long>();
				else if (obj is double)
					return obj.As<double>();
				else if (obj is float)
					return obj.As<float>();
				else if (obj is decimal)
					return obj.As<decimal>();
				else if (obj is bool)
					return obj.As<bool>();
				else if (obj is String)
					return obj.As<String>();
				else
				{
					var concreteType = Script.Write<string>("(obj.$$serType !== undefined) ? obj.$$serType : null");
					if (concreteType == null)
						throw new ArgumentException("Could not deserialise source as serialisation type is undefined.");

					var type = Type.GetType(concreteType);
					if (type == null)
						throw new ArgumentException($"Could not deserialise object as target type {concreteType} is not a valid type.");

					var newInstance = Activator.CreateInstance(type);
					var objKeys = Object.Keys(obj);

					for (var i = 0; i < objKeys.Length; i++)
					{
						var key = objKeys[i];
						if (ignorePropertyNames.Contains(key))
							continue;

						var value = Script.Write<object>("obj[key]");
						var deserialisedObj = deserialiser(value);
						Script.Write("newInstance[key] = deserialisedObj");
					}

					return newInstance;
				}
			};

			return deserialiser(baseObject).As<T>();
		}
	}

	class T : I
	{
		public int x { get; set; }
		public int y { get; set; }
		public int z { get; set; }
		public U bla { get; set; }
	}

	class U : I
	{
		public int a { get; set; }
		public int b { get; set; }
		public int c { get; set; }
		public bool d { get; set; }
	}

	interface I { }
}
