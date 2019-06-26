package com.entity.lyh;

import java.util.Date;

public class customers {
	private int cid;
	private String cname;
	private String password;
	private String idcard;
	private String phone;
	private int city;
	private String picture;
	private String email;
	private String sex;
	private Date birthday;
	public customers(int cid, String cname, String password, String idcard, String phone, int city, String picture,
			String email, String sex, Date birthday) {
		super();
		this.cid = cid;
		this.cname = cname;
		this.password = password;
		this.idcard = idcard;
		this.phone = phone;
		this.city = city;
		this.picture = picture;
		this.email = email;
		this.sex = sex;
		this.birthday = birthday;
	}
	public customers() {
		super();
		// TODO Auto-generated constructor stub
	}
	public int getCid() {
		return cid;
	}
	public void setCid(int cid) {
		this.cid = cid;
	}
	public String getCname() {
		return cname;
	}
	public void setCname(String cname) {
		this.cname = cname;
	}
	public String getPassword() {
		return password;
	}
	public void setPassword(String password) {
		this.password = password;
	}
	public String getIdcard() {
		return idcard;
	}
	public void setIdcard(String idcard) {
		this.idcard = idcard;
	}
	public String getPhone() {
		return phone;
	}
	public void setPhone(String phone) {
		this.phone = phone;
	}
	public int getCity() {
		return city;
	}
	public void setCity(int city) {
		this.city = city;
	}
	public String getPicture() {
		return picture;
	}
	public void setPicture(String picture) {
		this.picture = picture;
	}
	public String getEmail() {
		return email;
	}
	public void setEmail(String email) {
		this.email = email;
	}
	public String getSex() {
		return sex;
	}
	public void setSex(String sex) {
		this.sex = sex;
	}
	public Date getBirthday() {
		return birthday;
	}
	public void setBirthday(Date birthday) {
		this.birthday = birthday;
	}
	@Override
	public String toString() {
		return "customers [cid=" + cid + ", cname=" + cname + ", password=" + password + ", idcard=" + idcard
				+ ", phone=" + phone + ", city=" + city + ", picture=" + picture + ", email=" + email + ", sex=" + sex
				+ ", birthday=" + birthday + "]";
	}
	
	
}
