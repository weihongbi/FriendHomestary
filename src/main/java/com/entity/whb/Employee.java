package com.entity.whb;

public class Employee {
	private Integer empid;
	private String empname;
	private String phone;
	private String idcard;
	private Integer state;
	public Employee() {
		super();
		// TODO Auto-generated constructor stub
	}
	public Employee(Integer empid, String empname, String phone, String idcard, Integer state) {
		super();
		this.empid = empid;
		this.empname = empname;
		this.phone = phone;
		this.idcard = idcard;
		this.state = state;
	}
	public Integer getEmpid() {
		return empid;
	}
	public void setEmpid(Integer empid) {
		this.empid = empid;
	}
	public String getEmpname() {
		return empname;
	}
	public void setEmpname(String empname) {
		this.empname = empname;
	}
	public String getPhone() {
		return phone;
	}
	public void setPhone(String phone) {
		this.phone = phone;
	}
	public String getIdcard() {
		return idcard;
	}
	public void setIdcard(String idcard) {
		this.idcard = idcard;
	}
	public Integer getState() {
		return state;
	}
	public void setState(Integer state) {
		this.state = state;
	}
	@Override
	public String toString() {
		return "Employee [empid=" + empid + ", empname=" + empname + ", phone=" + phone + ", idcard=" + idcard
				+ ", state=" + state + "]";
	}
	
}
