#!/usr/bin/python3
# -*- coding: UTF-8 -*-

import sys
import time  # 计时用

def main():
    try:
        t = int(sys.stdin.readline())
    except:
        print("The data need to be integer")
        return
    if t <= 0:
        print("The data may have mistakes")
        return
    for _ in range(t):
        try:
            n = int(sys.stdin.readline())
        except:
            print("The data need to be integer")
            continue
        if n < 0:
            print("The data may have mistakes")
            continue
        start_time = time.time()  #to get running time
        if n % 2 == 1 or n < 4:
            print(-1)
            continue
        if n % 6 == 2 and n < 8:
            print(-1)
            continue
        maxCrafts = n // 4
        rem = n % 6
        if rem == 0:
            minCrafts = n // 6
        elif rem == 2:
            minCrafts = (n - 8) // 6 + 2
        else:
            minCrafts = n // 6 + 1
        print(minCrafts, maxCrafts)
    end_time = time.time()
    print("\nrunning time：%.6f 秒" % (end_time - start_time))

if __name__ == "__main__":
    main()
