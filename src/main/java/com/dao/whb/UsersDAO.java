package com.dao.whb;

import com.entity.whb.Users;
import org.apache.ibatis.annotations.Mapper;
import org.apache.ibatis.annotations.Select;

import java.util.List;
@Mapper
public interface UsersDAO {
    @Select("select * from users where uname=#{value}")
    List<Users> find(String uname);
}
