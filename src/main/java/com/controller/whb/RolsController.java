package com.controller.whb;

import javax.annotation.Resource;

import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.ResponseBody;

import com.entity.whb.Rols;
import com.google.gson.Gson;
import com.service.whb.RolsService;

@Controller
@RequestMapping("rols")
public class RolsController {
	@Resource
	RolsService service;
	@RequestMapping("queryRols")
	@ResponseBody
	public String queryRols(Model m) {
		Gson g = new Gson();
		return g.toJson(service.queryRols());
	}
	@RequestMapping("addrols")	
	public String addrols(Rols rols) {
		service.add(rols);
		return "redirect:queryRols";
	}
	@RequestMapping("delrols")
	@ResponseBody
	public String delrols(Integer rid) {
		service.delrols(rid);
		return "1";
	}
}
