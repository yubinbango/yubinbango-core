#!/usr/bin/env python
# -*- coding: utf-8 -*-

import re
import subprocess
import glob

# tsc yubinbango-core.ts --out yubinbango-core-src.js --removeComments --sourcemap
# uglifyjs yubinbango-core-src.js -o yubinbango-core.js --source-map yubinbango-core.js.map --in-source-map yubinbango-core-src.js.map -m 'sort,eval' --mangle-props --reserved-file reserve.json -c

for name in glob.glob('./*.ts'):
  if re.search('(.*).ts$', name) is not None:
    a = re.search('(.*)(.ts$)', name).group(1)
    b = '''tsc {filename}.ts --out {filename}-src.js --removeComments --sourcemap; uglifyjs {filename}-src.js -o {filename}.js --source-map {filename}.js.map --in-source-map {filename}-src.js.map -m 'sort,eval'  --mangle-props --reserved-file reserve.json -c'''
    subprocess.call(b.format(filename=a), shell=True)
