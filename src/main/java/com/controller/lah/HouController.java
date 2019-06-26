package com.controller.lah;

import javax.annotation.Resource;

import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.RequestMapping;

import com.dao.lah.houseDao;



@Controller
@RequestMapping("/house")
public class HouController {
	@Resource
    houseDao dao;
	
	
	  @RequestMapping("query") 
	  public String query(Model model){
		  model.addAttribute("list",dao.queryAll()); 
		  return "front/fangwuxiangqing"; 
	  }
	 
}
