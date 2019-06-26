package com.service.lyh;

import java.util.List;
import java.util.Map;

import javax.annotation.Resource;

import org.springframework.stereotype.Service;

import com.dao.lyh.areasDao;
import com.entity.lyh.Pages;

@Service
public class areasService {

	@Resource
	areasDao dao;
	
	public List<Map<String,Object>> queryAll(){
		return dao.queryAll();
	}

	public Pages queryPage(Integer pageNum, Integer pageSize){
		Pages pages=new Pages();
		pages.setRows(dao.queryPage((pageNum-1)*pageSize, pageSize));
		pages.setTotal(dao.getCount());
		return pages;
	}
}
