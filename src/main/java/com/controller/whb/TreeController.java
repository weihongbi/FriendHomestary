package com.controller.whb;

import com.google.gson.Gson;
import com.service.whb.TreeSerivce;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.ResponseBody;

import javax.annotation.Resource;

@Controller
@RequestMapping("/tree")
public class TreeController {
    @Resource
    TreeSerivce serivce;
    @RequestMapping("getTreeByRid")
    @ResponseBody
    public String getTreeByRid(Integer rid) {
        Gson g = new Gson();        
        return g.toJson(serivce.getTreeByRid(rid));
    }
    @RequestMapping("getTree")
    @ResponseBody
    public String getTree() {
        Gson g = new Gson();        
        return g.toJson(serivce.getTree());
    }
}
