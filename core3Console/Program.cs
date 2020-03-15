using System;


namespace core3Console {
    
    public delegate void deTest(int x);

    public class DelegateTest{
        public void printX(int x)
        {
            Console.WriteLine(x);
        }
    }
    public class Program {


        public static deTest de1;
        static void Main (string[] args) {

            DelegateTest tt = new DelegateTest();            
            de1 = tt.printX;

            de1(100);
        }


        static void ChangeCar (Car car) {
            car.num = 100;
        }

        static void SwapCar (ref Car car1, ref Car car2) {
            Car temp = car1;
            car1 = car2;
            car2 = temp;
        }
    }

    class Car {
        public int num { get; set; }
    }
}