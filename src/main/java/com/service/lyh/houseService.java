package com.service.lyh;

import java.util.List;
import java.util.Map;

import javax.annotation.Resource;

import org.springframework.stereotype.Service;

import com.dao.lyh.houseDao;
import com.entity.lyh.housetype;

@Service
public class houseService {
	@Resource
	houseDao dao;
	
	public List<Map<String,Object>> queryAll(){
		return dao.queryAll();
	}
	
	public List<housetype> queryhouseType(){
		return dao.queryhouseType();
	}
	
	public List<Map<String,Object>> query2(String city,String houseTypeName,String rentName){
		return dao.query2(city, houseTypeName, rentName);
	}
}
