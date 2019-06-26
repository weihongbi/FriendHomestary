package com.service.whb;

import java.util.List;

import javax.annotation.Resource;

import org.springframework.stereotype.Service;

import com.dao.whb.EmployeeDAO;
import com.entity.whb.Employee;

@Service
public class EmployeeService {
	@Resource
	EmployeeDAO dao;
	public List<Employee> queryAll(){
		return dao.queryAll();
	}
	public Integer add(Employee e) {
		return dao.add(e);
	}
	public Integer delEmp(Integer empid) {
		return dao.delEmp(empid);
	}
	public List<Employee> queryU(){
		return dao.queryU();
	}
}
