package com.controller.whb;

import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestMapping;

@Controller
@RequestMapping("/html")
public class HtmlController {
    @RequestMapping("loginhtml")
    public String loginhtml(){
        return "back/login";
    }
    @RequestMapping("mainhtml")
    public String mainhtml(){
        return "back/main";
    }
    //前台
    @RequestMapping("indexhtml")
    public String indexhtml(){
        return "front/index";
    }
    
    @RequestMapping("duanzufanghtml")
    public String duanzufanghtml(){
        return "/front/duanzufang";
    }
    
}
