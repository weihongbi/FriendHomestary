package com.controller.whb;

import com.service.whb.UsersService;
import org.apache.shiro.SecurityUtils;
import org.apache.shiro.authc.AuthenticationException;
import org.apache.shiro.authc.UsernamePasswordToken;
import org.apache.shiro.subject.Subject;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.ResponseBody;

import javax.annotation.Resource;
import javax.servlet.http.HttpSession;

@Controller
public class UsersController {
    @Resource
    UsersService service;
    @RequestMapping("/dologin")    
    public String doLogin(String uname, String upwd, HttpSession session) {
        // 创建Subject实例
        Subject currentUser = SecurityUtils.getSubject();
        // 将用户名及密码封装到UsernamePasswordToken
        UsernamePasswordToken token = new UsernamePasswordToken(uname,upwd);
        try {
            currentUser.login(token);
            String u = (String) currentUser.getPrincipal();
            session.setAttribute("user", u);
            // 判断当前用户是否登录
            if (currentUser.isAuthenticated() == true) {
                return "/back/main";
            }
        } catch (AuthenticationException e) {
            System.out.println("登录失败");
        }
        return "/back/login";
    }
}
