package com.service.lah;

import java.util.List;

import javax.annotation.Resource;

import org.springframework.stereotype.Service;

import com.dao.lah.customerDao;
import com.entity.lah.Customers;

@Service
public class CustService {
	@Resource
	customerDao dao;
	
	public List<Customers> login(String cname, String password) {
		return dao.login(cname,password);
	}
	public int doadd(Customers c){
		return dao.doadd(c);
	}

}
