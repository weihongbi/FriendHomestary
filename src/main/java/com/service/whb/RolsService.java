package com.service.whb;

import java.io.Serializable;
import java.util.List;

import javax.annotation.Resource;

import org.springframework.stereotype.Service;

import com.dao.whb.RolsDAO;
import com.entity.whb.R_N;
import com.entity.whb.Rols;

@Service
public class RolsService{
	@Resource
	RolsDAO dao;
	public Serializable add(Rols r) {
		return dao.add(r);
	}
	public int update(Rols r) {
		return dao.update(r);
	}
	public int delrols(Integer rid) {							
		return dao.delrols(rid);
	}
	public List<Rols> queryRols() {
		return dao.queryRols();		
	}
	public List<R_N> query(Integer rid) {		
		return dao.query(rid);
	}
}
