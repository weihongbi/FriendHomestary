package com.service.whb;

import java.io.Serializable;

import javax.annotation.Resource;

import org.springframework.stereotype.Service;

import com.dao.whb.R_NDAO;

@Service
public class R_NService {
	@Resource
	R_NDAO dao;
	
	public int rnDel(Integer rid) {
		return dao.rnDel(rid);
	}
	
	public Serializable rnAdd(Integer rid,Integer nid) {
		return dao.rnAdd(rid,nid);
	}
}
