package com.controller.lah;

import com.dao.lah.ApartmentDAO;
import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.RequestMapping;

import javax.annotation.Resource;

@Controller
@RequestMapping("/apart")
public class ApartContoller {
    @Resource
    ApartmentDAO dao;

    @RequestMapping("query")
    public String query(Model model){
        model.addAttribute("list", dao.query());
        return "back/apartments";
    }
}
