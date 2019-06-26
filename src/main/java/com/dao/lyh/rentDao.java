package com.dao.lyh;

import java.util.List;

import org.apache.ibatis.annotations.Delete;
import org.apache.ibatis.annotations.Insert;
import org.apache.ibatis.annotations.Mapper;

import org.apache.ibatis.annotations.Select;
import org.apache.ibatis.annotations.Update;

import com.entity.lyh.rent;



@Mapper
public interface rentDao {

	@Insert("insert into rent (rentName) values (#{rentName})")
	int add(rent r);

	@Select("select * from rent")
	public List<rent> query();
	
	@Select("select * from rent where rentid=#{rentid}")
	rent queryById(Integer rentid);

	@Update("update rent set rentName=#{rentName} where rentid=#{rentid}")
	int update(rent u);

	@Delete("delete from rent where rentid=#{rentid}")
	int del(Integer rentid);

}
