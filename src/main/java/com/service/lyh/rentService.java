package com.service.lyh;

import java.util.List;

import javax.annotation.Resource;

import org.springframework.stereotype.Service;

import com.dao.lyh.rentDao;
import com.entity.lyh.rent;


@Service
public class rentService {
	@Resource
	rentDao dao;

	
	public int add(rent r){
		return dao.add(r);
	}
	
	public List<rent> query(){
		return dao.query();
	}
	
	public rent queryById(Integer rentid){
		return dao.queryById(rentid);
	}

	public int update(rent r) {
		return dao.update(r);
	}
	
	public int del(Integer rentid) {
		return dao.del(rentid);
	}

}
