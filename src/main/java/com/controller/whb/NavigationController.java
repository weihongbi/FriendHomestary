package com.controller.whb;

import com.service.whb.NavigationService;
import org.springframework.stereotype.Controller;

import javax.annotation.Resource;

@Controller
public class NavigationController {
    @Resource
    NavigationService service;
    public String queryNav(){
        return "";
    }
}
