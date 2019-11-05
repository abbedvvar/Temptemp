import hashlib

l = [b"", b"",b"",b"",b""]


for x in l:

    print('"' + hashlib.sha224(x).hexdigest() + '",')