package com.controller.whb;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.ResponseBody;

import com.entity.whb.Employee;
import com.google.gson.Gson;
import com.service.whb.EmployeeService;
import com.service.whb.UsersService;

@Controller
@RequestMapping("emp")
public class EmployeeController {
	@Autowired
	EmployeeService service;
	@Autowired
	UsersService uservice;
	@RequestMapping("queryAll")
	@ResponseBody
	public String queryAll(Model m) {
		Gson g = new Gson();
		return g.toJson(service.queryAll());
	}
	@RequestMapping("addEmp")
	public String add(Employee e) {
		service.add(e);
		return "redirect:queryAll";
	} 
	@RequestMapping("delEmp")
	@ResponseBody
	public String delEmp(Integer empid) {
		service.delEmp(empid);
		uservice.delUsers(empid);
		return "1";
	} 
	@RequestMapping("queryU")
	@ResponseBody
	public String queryU() {
		Gson g = new Gson();
		return g.toJson(service.queryU());
	} 
}
