#!/usr/bin/python3
# -*- coding: UTF-8 -*-
        
def main():
    try:
        t = int(input())
    except:
        print("The data need to be integer")
        return
    if t <= 0:
        print("The data may have some mistakes")
        return
    
    for _ in range(t):
        try:
            x, n = map(int, input().split())
        except:
            print("The input need to be two integers")
            continue
        if n < 0 or x < 0:
            print("The data may have some mistakes")
            continue
        if n % 2 == 1:
            print(x)
        else:
            print(0)

if __name__ == "__main__":
    main()
