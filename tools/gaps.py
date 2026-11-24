import wave,sys,numpy as np
w=wave.open(sys.argv[1]);sr=w.getframerate();n=w.getnchannels()
a=np.frombuffer(w.readframes(w.getnframes()),dtype=np.int16).astype(float)
if n>1:a=a.reshape(-1,n).mean(1)
h=int(sr*0.02);e=np.sqrt((a[:len(a)//h*h].reshape(-1,h)**2).mean(1));sp=e>e.max()*0.04
i=0;out=[]
while i<len(sp):
    if not sp[i]:
        j=i
        while j<len(sp) and not sp[j]:j+=1
        if (j-i)*0.02>=0.12:out.append((round(i*.02,2),round(j*.02,2)))
        i=j
    else:i+=1
print(out)
