import sys
import re

fo = open("foo.txt", "w")

for arg in sys.argv:
	with open(arg, "r") as doc:
		for line in doc:
			if"Long Running Anime" in line:
					continue

			elif re.match( r'^[*] [*][*].*[*][*]' , line, re.I) :
				line = re.sub('[*]', '', line)
				line = re.sub('^(\s)*', '', line)
				print line
				fo.write(line)

			elif re.match( r'^[*].* ' , line, re.I) :
				line = re.sub('[*]', '', line)
				line = re.sub('^(\s)*', '', line)
				print line
				fo.write(line)

