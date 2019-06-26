package com.sendMessage;

import java.util.List;

public class JsonCrudModel<T> {
    private static final long serialVersionUID = -1058648070426366736L;

    public static final int   Status_Success   = 200;
    public static final int   Status_Error     = 300;
    public static final int   Status_Session   = 400;

    private int status;
    private String message;

    private T result;
    private List<T> results;

    /**
     * 状态为Error
     */
    public JsonCrudModel() {
        this.status = Status_Error;
    }

    /**
     * 传入状态
     */
    public JsonCrudModel(int status) {
        this.status = status;
    }

    /**
     * 传入消息,状态为Error
     */
    public JsonCrudModel(String message) {
        this.status = Status_Error;
        this.message = message;
    }

    /**
     * 传入状态,消息
     */
    public JsonCrudModel(int status, String message) {
        this.status = status;
        this.message = message;
    }

    /**
     * 传入消息,状态
     */
    public JsonCrudModel(String message, int status) {
        this.status = status;
        this.message = message;
    }

    public String getMessage() {
        return message;
    }

    public void setMessage(String message) {
        this.message = message;
    }

    public int getStatus() {
        return status;
    }

    public void setStatus(int status) {
        this.status = status;
    }

    public T getResult() {
        return result;
    }

    public void setResult(T result) {
        this.result = result;
    }

    public List<T> getResults() {
        return results;
    }

    public void setResults(List<T> results) {
        this.results = results;
    }

}