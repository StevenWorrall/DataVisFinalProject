import re
import urllib.request
from bs4 import BeautifulSoup
import os
from nltk.corpus import stopwords
import json

wordCount = {}
byYear = {}
songDict = {}


def get_lyrics(artist, song_title):
    artist = artist.lower()
    song_title = song_title.lower()
    # remove all except alphanumeric characters from artist and song_title
    artist = re.sub('[^A-Za-z0-9]+', "", artist)
    song_title = re.sub('[^A-Za-z0-9]+', "", song_title)
    if artist.startswith("the"):  # remove starting 'the' from artist e.g. the who -> who
        artist = artist[3:]
    url = "http://azlyrics.com/lyrics/" + artist + "/" + song_title + ".html"

    try:
        content = urllib.request.urlopen(url).read()
        soup = BeautifulSoup(content, 'html.parser')
        lyrics = str(soup)
        # lyrics lies between up_partition and down_partition
        up_partition = '<!-- Usage of azlyrics.com content by any third-party lyrics provider is prohibited by our licensing agreement. Sorry about that. -->'
        down_partition = '<!-- MxM banner -->'
        lyrics = lyrics.split(up_partition)[1]
        lyrics = lyrics.split(down_partition)[0]
        lyrics = lyrics.replace('<br>', '').replace('</br>', '').replace('</div>', '').strip()
        return lyrics
    except:
        return


def getSongs():
    path = 'songtitles/'
    files = os.listdir(path)

    for file in files:
        file = open(path+file, "r")
        year = file.readline()
        for i in range(1):
            number = file.readline()
            song = file.readline()
            artist = file.readline()
            lyrics = get_lyrics(artist, song)
            if (lyrics != None):
                songDict[year.strip()] = makeSongDict(lyrics, artist, song)


def makeSongDict(lyrics, artist, song):
    tempDict = {}
    moreTempDict = {}
    stop_words = set(stopwords.words('english'))
    full_pattern = re.compile('[^a-zA-Z0-9]')


    lyrics = lyrics.split()

    for word in lyrics:
        word = re.sub(full_pattern, '', str(word))
        if word not in stop_words:
            if word not in tempDict:
                tempDict[word] = 0
            tempDict[word] += 1

    newTempDict = {}

    for key in tempDict:
        if tempDict[key] > 2:
            newTempDict[key] = tempDict[key]

    moreTempDict[song.strip() + ' - ' + artist.strip()] = newTempDict

    return moreTempDict


def writeOut(inDict):
    with open('data.json', 'w') as outfile:
        json.dump(inDict, outfile)


def main():
    getSongs()
    writeOut(songDict)
main()