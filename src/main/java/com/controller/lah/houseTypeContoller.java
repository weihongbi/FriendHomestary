package com.controller.lah;

import com.dao.lah.hourseTypeDao;

import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.RequestMapping;

import javax.annotation.Resource;

@Controller
@RequestMapping("/htype")
public class houseTypeContoller {
    @Resource
    hourseTypeDao dao;

    @RequestMapping("query")
    public String query(Model model){
        model.addAttribute("list", dao.query());
        return "back/housetype";
    }
}
