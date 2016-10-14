import sys
import re
import os

fo = open("data.txt", "w")

for file in os.listdir("data"):
	#print file
	doc = open("data/" + file, "r")
	for line in doc:
		if "Long Running Anime" in line:
			continue

		elif "anime" in line.lower():
			continue
		elif "visual novel" in line.lower():
			continue
		elif "manga" in line.lower():
			continue

		elif re.match( r'^[*] [*][*].*[*][*]' , line, re.I) :
			line = re.sub('[*]', '', line)
			line = re.sub('^(\s)*', '', line)
			#print line
			fo.write(line)

		elif re.match( r'^[*].* ' , line, re.I) :
			line = re.sub('[*]', '', line)
			line = re.sub('^(\s)*', '', line)
			#print line
			fo.write(line)

