package com.controller.whb;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.ResponseBody;

import com.dao.whb.RentDao;
import com.google.gson.Gson;

@Controller
@RequestMapping("rent")
public class RentController {
	@Autowired
	RentDao dao;
	
	@RequestMapping("queryAll")
	@ResponseBody
	public String queryAll(Model m) {
		Gson g = new Gson();
		return g.toJson(dao.query());
	}
}
