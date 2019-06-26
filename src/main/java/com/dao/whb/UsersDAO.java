package com.dao.whb;

import java.util.List;
import java.util.Map;

import org.apache.ibatis.annotations.Delete;
import org.apache.ibatis.annotations.Insert;
import org.apache.ibatis.annotations.Mapper;
import org.apache.ibatis.annotations.Select;

import com.entity.whb.Users;
@Mapper
public interface UsersDAO {
    @Select("select * from users where uname=#{value}")
    List<Users> find(String uname);
    @Delete("delete from users where empid = #{empid}")
	public Integer delUsers(Integer empid);
    @Select("select u.*,e.empname empname from users u LEFT JOIN employee e ON u.empid = e.empid")
    public List<Map<String,Object>> queryUsers();   
    @Insert("INSERT INTO `house`.`users` (`empid`, `uname`, `upwd`, `rid`) VALUES (#{empid}, #{uname}, #{upwd},#{rid})")
    public Integer addUsers(Users u);
}
