package com.tuo.gitproject.config.exception;


//import com.tuo.study.commons.response.Msg;
//import com.tuo.study.commons.response.STATE;
//import org.aspectj.lang.ProceedingJoinPoint;
//import org.aspectj.lang.annotation.Around;
//import org.aspectj.lang.reflect.MethodSignature;
//import org.springframework.core.Ordered;
//import org.springframework.stereotype.Component;

/**
 * @Author: Feng
 * @Date: 2018/12/26 9:52
 */
//@Component
//@Order(value = Ordered.HIGHEST_PRECEDENCE)
//@Aspect
//public class ExceptionToMsgAdvise {
//
//    @Around("@annotation(org.springframework.transaction.annotation.Transactional)")
//    public Object handleExceptionToMsg(ProceedingJoinPoint proceedingJoinPoint) throws Throwable {
//        Class<?> returnType = null;
//        try {
//            returnType = ((MethodSignature)proceedingJoinPoint.getSignature()).getMethod().getReturnType();
//            return proceedingJoinPoint.proceed();
//        } catch (Throwable throwable) {
//            if(returnType != null && returnType == Msg.class)
//                return new Msg.Builder()
//                            .setMsg(throwable.getMessage())
//                            .setState(STATE.Error)
//                            .build();
//            throw throwable;
//        }
//    }

//}
