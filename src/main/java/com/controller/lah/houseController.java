package com.controller.lah;

import javax.annotation.Resource;

import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.RequestMapping;

import com.dao.lah.houseDao;



@Controller
@RequestMapping("/house")
public class houseController {
	@Resource
    houseDao dao;
	
	/*
	 * @RequestMapping("fangwu") public String fangwu(){ return
	 * "front/fangwuxiangqing"; }
	 * 
	 * @RequestMapping("query") public List<Map<String, Object>> query(){
	 * 
	 * return dao.queryId(); }
	 */
	
	  @RequestMapping("query") 
	  public String query(Model model){
		  model.addAttribute("list", dao.queryId()); 
		  return "front/fangwuxiangqing"; 
	  }
	 
}
