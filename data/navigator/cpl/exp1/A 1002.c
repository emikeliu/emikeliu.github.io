#include<stdio.h>
int main()
{
    int x,y;
    scanf("x = %d, y = %d",&x,&y);
    printf("x + y : %d\nx - y : %d\nx * y : %d\nx / y quotient: %d, remainder: %d\nx ^ 2 : %d\ny ^ 3 : %d",x+y,x-y,x*y,x/y,x%y,x*x,y*y*y);
    return 0;
}