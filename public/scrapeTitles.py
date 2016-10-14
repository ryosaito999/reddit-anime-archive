import sys
import re
import os

def stringMods(line):
	line = re.sub('[*]', '', line)
	line = re.sub('^(\s)*', '', line)
	line = re.sub('(\s)-(\s)Irregular(\s)threads', '', line)
	line = re.sub('\"', '', line)
	line = re.sub('\n', '', line)

	fo.write("\"%s\",\n" %(line))
	return


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
			stringMods(line)

		elif re.match( r'^[*].* ' , line, re.I) :
			stringMods(line)

