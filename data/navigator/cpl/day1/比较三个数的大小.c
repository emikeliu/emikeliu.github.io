#include <stdio.h>
int main()
{
    int a,b,c;
    scanf("%d%d%d",&a,&b,&c);
    if(a>b)/*a>b*/
    {
        if(a>c)/*a>(b,c)*/
        {
            if(b>c)/*a>b>c*/
            {
                printf("%d %d %d",a,b,c);
            }
            else/*a>c>b*/
            {
                printf("%d %d %d",a,c,b);
            }
        }
        else
        {
            printf("%d %d %d",c,a,b);
        }
    }
    else/*b>a*/
    {
        if(c>a) /*(b,c)>a*/
        {
            if(b>c)/*b>c>a*/
            {
                printf("%d %d %d",b,c,a);
            }
            else/*c>b>a*/
            {
                printf("%d %d %d",c,b,a);
            }
        }
        else/*b>a>c*/
        {
          printf("%d %d %d",b,a,c);  
        }

    }
}
