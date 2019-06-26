package com.entity.lyh;

import java.util.List;

public class Pages<T> {
	private List<T> rows;
	private Integer total;
	public Pages() {
		super();
		// TODO Auto-generated constructor stub
	}
	public Pages(List<T> rows, Integer total) {
		super();
		this.rows = rows;
		this.total = total;
	}
	public List<T> getRows() {
		return rows;
	}
	public void setRows(List<T> rows) {
		this.rows = rows;
	}
	public Integer getTotal() {
		return total;
	}
	public void setTotal(Integer total) {
		this.total = total;
	}
	@Override
	public String toString() {
		return "Pages [rows=" + rows + ", total=" + total + "]";
	}
	
	
}
