package ee.mihkel.rendipood.dto;

// data transfer object ---> mis mudeli abil andmeid liigutatakse
// entity ---> mis läheb andmebaasi

import lombok.Data;

@Data // NoArgsConstructor, Getter, Setter
public class FilmDTO {
    private Long id;
    private int actualDaysOut;
}
