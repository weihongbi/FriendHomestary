package com.controller.whb;

import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestMapping;

@Controller
public class HtmlController {
    @RequestMapping("loginhtml")
    public String loginhtml(){
        return "back/login";
    }
    @RequestMapping("mainhtml")
    public String mainhtml(){
        return "back/main";
    }
    @RequestMapping("queryEmp")
    public String queryEmp(){
        return "back/queryEmp";
    } 
    @RequestMapping("queryRent")
    public String queryRent(){
        return "back/Rent";
    } 
    @RequestMapping("queryUsershtml")
    public String queryUsershtml(){
        return "back/queryUsers";
    }
    @RequestMapping("rolsManagerhtml")
    public String rolsManagerhtml(){
        return "back/rolsManager";
    } 
    
    
    
    
    @RequestMapping("indexhtml")
    public String indexhtml(){
        return "front/index";
    }
}
