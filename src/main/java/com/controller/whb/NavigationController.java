package com.controller.whb;

import com.google.gson.Gson;
import com.service.whb.NavigationService;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.ResponseBody;

import javax.annotation.Resource;

@Controller
@RequestMapping("nav")
public class NavigationController {
    @Resource
    NavigationService service;
    @RequestMapping("queryNid")
    @ResponseBody
    public String queryNid(Integer rid){
    	Gson g = new Gson();
        return g.toJson(service.queryRids(rid));
    }
}
