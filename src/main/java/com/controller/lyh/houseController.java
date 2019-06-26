package com.controller.lyh;


import javax.annotation.Resource;
import javax.servlet.http.HttpSession;

import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.RequestMapping;


import com.service.lyh.houseService;

@Controller
public class houseController {
	@Resource
	houseService service;
	
	@RequestMapping("queryHouse")
	public String queryHouse(Model m){
		m.addAttribute("listHouse", service.queryAll());
		System.out.println(service.queryAll());
		return "/front/duanzufang";
	}
	@RequestMapping("queryhouseType")
	public String queryhouseType(Model m) {
		m.addAttribute("listhouseType", service.queryhouseType());
		return "/front/duanzufang";
	}
	
	@RequestMapping("query2")
	public String query2(String city,String houseTypeName,String rentName,Model m) {
		m.addAttribute("listHouse", service.queryAll());
		m.addAttribute("list2", service.query2(city, houseTypeName, rentName));
		m.addAttribute("listhouseType", service.queryhouseType());
		return "/front/duanzufang";
	}
}
