package com.tuo.gitproject.config.web;//package com.linsy.product.upload.config.web;
//
//import com.linsy.product.upload.service.UploadService;
//import org.springframework.stereotype.Component;
//import org.springframework.web.servlet.ModelAndView;
//import org.springframework.web.servlet.handler.HandlerInterceptorAdapter;
//
//import javax.servlet.http.HttpServletRequest;
//import javax.servlet.http.HttpServletResponse;
//
//@Component
//public class WebFilter extends HandlerInterceptorAdapter {
//
//    private UploadService uploadService;
//
//    public void setUploadService(UploadService uploadService) {
//        this.uploadService = uploadService;
//    }
//
//    @Override
//    public boolean preHandle(HttpServletRequest request, HttpServletResponse response, Object handler) throws Exception {
//        System.out.println(request.getRequestURI());
//        return super.preHandle(request, response, handler);
//    }
//}
