package com.dao.whb;

import java.util.List;

import org.apache.ibatis.annotations.Delete;
import org.apache.ibatis.annotations.Insert;
import org.apache.ibatis.annotations.Mapper;
import org.apache.ibatis.annotations.Select;

import com.entity.whb.Employee;

@Mapper
public interface EmployeeDAO {
	@Select("select * from employee")
	public List<Employee> queryAll();
	@Insert("INSERT INTO `house`.`employee` ( `empname`, `phone`, `idcard`, `state`) VALUES (#{empname}, #{phone}, #{idcard},1)")
	public Integer add(Employee e);
	@Delete("delete from employee where empid = #{empid}")
	public Integer delEmp(Integer empid);	
	@Select("select * from employee where empid not in (SELECT empid from users)")
	public List<Employee> queryU();
}
