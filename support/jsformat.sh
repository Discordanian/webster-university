#!/bin/sh

if [ -f /usr/local/bin/js-beautify ]
then
        echo Running on OSX
	JSBIN=/usr/local/bin/js-beautify 
fi

if [ -f /home/n620911/opt/bin/js-beautify ]
then
        echo Running on Linux
	JSBIN=/home/n620911/opt/bin/js-beautify 
fi

if [ "$JSBIN" == "" ]
then
	echo "No beautifier found"
	exit 1
fi



DIRNAME=`dirname $0`
cd $DIRNAME/../js/

for JSFILE in *.js
do
	cp $JSFILE $JSFILE.before
	$JSBIN   $JSFILE  > $JSFILE.after
	mv $JSFILE.after $JSFILE
	echo "" >> $JSFILE
        cmp $JSFILE $JSFILE.before >/dev/null 2>&1
        if [ $? -eq 0 ]
	then
		echo "No change between before and after.  Remove before file."
		rm $JSFILE.before
	fi
done

cd -

cd $DIRNAME/../test/spec/
for JSFILE in *.js
do
	cp $JSFILE $JSFILE.before
	$JSBIN   $JSFILE  > $JSFILE.after
	mv $JSFILE.after $JSFILE
	echo "" >> $JSFILE
        cmp $JSFILE $JSFILE.before
        if [ $? -eq 0 ]
	then
		echo "No change between before and after.  Remove before file."
		rm $JSFILE.before
	fi
done

