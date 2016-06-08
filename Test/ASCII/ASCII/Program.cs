using System;
using System.Collections.Generic;
using System.Drawing;

namespace ASCII
{
	class Program
	{
		static char[] characters = new char[] {
			',', '.', '-', '_',
			'^', '!', '$', '\'',
			'?', '%', '~', '£',
			'[', ']', '#', '@'
		};

		static ConsoleColor[] charColours = new ConsoleColor[16];

		static void Main(string[] args)
		{
			var hs = new HashSet<int>();
			var r = new Random();
			for(var i = 0; i < 16; i++)
			{
				var j = r.Next(0, 16);

				if(hs.Contains(j))
				{
					i--;
					continue;
				}

				charColours[i] = (ConsoleColor)j;
			}

			var image = (Bitmap)Image.FromFile("pepe.png");
			var stepInterval = 7;
			var stepInterval2 = stepInterval * stepInterval;
			var buffer = new char[image.Width * image.Height / stepInterval];
			var bufferWidth = image.Width / stepInterval;
			var bufferHeight = image.Height / stepInterval;
			var colourBuffer = new int[image.Width * image.Height / stepInterval];

			for (int y = 0, yy = 0; y < image.Height; y += stepInterval, yy++)
			{
				for (int x = 0, xx = 0; x < image.Width; x += stepInterval, xx++)
				{
					var ar = 0;
					var ag = 0;
					var ab = 0;
					var aa = 0;

					for (var i = 0; i < stepInterval; i++)
					{
						for (var j = 0; j < stepInterval; j++)
						{
							var col = image.GetPixel(x, y);
							ar += col.R;
							ag += col.G;
							ab += col.B;
							aa += col.A;
						}
					}

					var index = (int)Math.Floor((ar + ag + ab + aa) / (double)(stepInterval2 + stepInterval2 + stepInterval2 + stepInterval2) / 255.0 * (characters.Length - 1));
					buffer[yy * bufferWidth + xx] = characters[index];
					colourBuffer[yy * bufferWidth + xx] = index;
				}
			}

			var rand = new Random();
			for (var y = 0; y < bufferHeight; y++)
			{
				for (var x = 0; x < bufferWidth; x++)
				{
					var charIndex = buffer[y * bufferWidth + x];
					Console.ForegroundColor = charColours[colourBuffer[y * bufferWidth + x]];
					Console.Write(charIndex);
				}
				Console.WriteLine();
			}

			Console.ReadKey();
		}
	}
}
