package com.dao.lah;

import java.util.List;

import org.apache.ibatis.annotations.Mapper;

import com.entity.lah.Customers;

@Mapper
public interface customerDao {
	 public List<Customers> login(String cname,String password);
	 int doadd(Customers c);
}
