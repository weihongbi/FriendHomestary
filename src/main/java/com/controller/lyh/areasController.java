package com.controller.lyh;

import java.util.List;
import java.util.Map;

import javax.annotation.Resource;

import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.ResponseBody;

import com.entity.lyh.Pages;
import com.service.lyh.areasService;

@Controller
public class areasController {
	@Resource
	areasService service;
	
	@RequestMapping(value="topageAreas")
	public String topageAreas(){
		return "back/areaslist";
	}
	
	@RequestMapping("queryAreas")
	@ResponseBody
	public List<Map<String,Object>> queryAreas() {
		return service.queryAll();
	}
	
	@RequestMapping("queryAreasPage")
	@ResponseBody
	public Pages queryAreasPage(Integer page,Integer rows) {
		return service.queryPage(page,rows); 
	}
}
