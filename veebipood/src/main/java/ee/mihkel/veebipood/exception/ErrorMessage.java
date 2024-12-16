package ee.mihkel.veebipood.exception;

import lombok.Data;

import java.util.Date;

@Data // getteri, setteri, noArgsConstructori
public class ErrorMessage {
    private String message;
    private int statusCode;
    private Date date;
}
