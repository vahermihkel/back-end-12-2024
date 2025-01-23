//package ee.mihkel.veebipood.service;
//
//import org.springframework.scheduling.annotation.Scheduled;
//import org.springframework.stereotype.Component;
//
//import java.util.Calendar;
//import java.util.Date;
//import java.util.GregorianCalendar;
//
//@Component
//public class CronService {
//// iga sekund, iga minut, iga tund, päeva kuu, kuu, nädalapäev
//    @Scheduled(cron = "0 * * * * *")
//    public void runEveryMinute() {
////        Calendar calendar = new GregorianCalendar();
////        System.out.println(Calendar.HOUR + ":" + Calendar.MINUTE + ":" + Calendar.SECOND);
//        Date date = new Date();
//        System.out.println(date.getMinutes() + ":" + date.getSeconds());
//    }
//
//    @Scheduled(cron = "*/60 * * * * *")
//    public void runEverySecond() {
////        Calendar calendar = new GregorianCalendar();
////        System.out.println(Calendar.HOUR + ":" + Calendar.MINUTE + ":" + Calendar.SECOND);
//        Date date = new Date();
//        System.out.println(date.getMinutes() + ":" + date.getSeconds());
//    }
//
//    @Scheduled(cron = "0 */30 * * * *")
//    public void runEvery30Mins() {
////        Calendar calendar = new GregorianCalendar();
////        System.out.println(Calendar.HOUR + ":" + Calendar.MINUTE + ":" + Calendar.SECOND);
//        Date date = new Date();
//        System.out.println(date.getMinutes() + ":" + date.getSeconds());
//    }
//
////    @Scheduled(cron = "0 0 * * * 1-5")
//    @Scheduled(cron = "0 0 * * * MON-FRI")
//    public void runEveryHourOnWeekdays() {
////        Calendar calendar = new GregorianCalendar();
////        System.out.println(Calendar.HOUR + ":" + Calendar.MINUTE + ":" + Calendar.SECOND);
//        Date date = new Date();
//        System.out.println(date.getMinutes() + ":" + date.getSeconds());
//    }
//
//}
