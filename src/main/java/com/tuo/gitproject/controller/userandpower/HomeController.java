package com.tuo.gitproject.controller.userandpower;

import com.tuo.gitproject.base.controller.BaseController;
import org.apache.shiro.SecurityUtils;
import org.apache.shiro.subject.Subject;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import javax.servlet.http.HttpServletRequest;

/**
 * 初始化页面
 */
@Controller
@RequestMapping("home")
public class HomeController extends BaseController {

    @GetMapping("/login")
    public String login(HttpServletRequest request) {
        System.out.println("进来登录页面了");
        Subject sb = SecurityUtils.getSubject();
        if (sb.isAuthenticated()) {
            return "redirect:/home/index";
        } else {
            return "views/test";
        }
    }
}

