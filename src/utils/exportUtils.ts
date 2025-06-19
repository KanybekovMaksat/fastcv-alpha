import html2canvas from 'html2canvas';
import jsPDF from 'jspdf';
import { Document, Packer, Paragraph, TextRun, HeadingLevel, AlignmentType, BorderStyle, WidthType, Table, TableRow, TableCell } from 'docx';
import { saveAs } from 'file-saver';
import { UserProfile } from '../types';

export const exportToPDF = async (elementId: string, filename: string = 'resume.pdf') => {
  try {
    const element = document.getElementById(elementId);
    if (!element) {
      throw new Error('Элемент для экспорта не найден');
    }

    // Создаем canvas из HTML элемента
    const canvas = await html2canvas(element, {
      scale: 2,
      useCORS: true,
      allowTaint: true,
      backgroundColor: '#ffffff',
      width: element.scrollWidth,
      height: element.scrollHeight
    });

    // Создаем PDF
    const imgData = canvas.toDataURL('image/png');
    const pdf = new jsPDF({
      orientation: 'portrait',
      unit: 'mm',
      format: 'a4'
    });

    const imgWidth = 210; // A4 width in mm
    const pageHeight = 297; // A4 height in mm
    const imgHeight = (canvas.height * imgWidth) / canvas.width;
    let heightLeft = imgHeight;
    let position = 0;

    // Добавляем первую страницу
    pdf.addImage(imgData, 'PNG', 0, position, imgWidth, imgHeight);
    heightLeft -= pageHeight;

    // Добавляем дополнительные страницы если необходимо
    while (heightLeft >= 0) {
      position = heightLeft - imgHeight;
      pdf.addPage();
      pdf.addImage(imgData, 'PNG', 0, position, imgWidth, imgHeight);
      heightLeft -= pageHeight;
    }

    // Сохраняем файл
    pdf.save(filename);
    return true;
  } catch (error) {
    console.error('Ошибка при экспорте в PDF:', error);
    throw new Error('Не удалось создать PDF файл');
  }
};

export const exportToWord = async (profile: UserProfile, templateId: string, filename: string = 'resume.docx') => {
  try {
    const doc = new Document({
      sections: [{
        properties: {},
        children: [
          // Заголовок с именем
          new Paragraph({
            children: [
              new TextRun({
                text: profile.fullName,
                bold: true,
                size: 32,
                color: "156dcf"
              })
            ],
            alignment: AlignmentType.CENTER,
            spacing: { after: 200 }
          }),

          // Должность
          new Paragraph({
            children: [
              new TextRun({
                text: profile.position,
                size: 24,
                color: "666666"
              })
            ],
            alignment: AlignmentType.CENTER,
            spacing: { after: 400 }
          }),

          // Контактная информация
          new Paragraph({
            children: [
              new TextRun({
                text: `📧 ${profile.email}`,
                size: 20
              }),
              ...(profile.phone ? [
                new TextRun({
                  text: ` | 📱 ${profile.phone}`,
                  size: 20
                })
              ] : []),
              ...(profile.location ? [
                new TextRun({
                  text: ` | 📍 ${profile.location}`,
                  size: 20
                })
              ] : [])
            ],
            alignment: AlignmentType.CENTER,
            spacing: { after: 400 }
          }),

          // О себе
          ...(profile.summary ? [
            new Paragraph({
              children: [
                new TextRun({
                  text: "О СЕБЕ",
                  bold: true,
                  size: 24,
                  color: "156dcf"
                })
              ],
              heading: HeadingLevel.HEADING_2,
              spacing: { before: 400, after: 200 }
            }),
            new Paragraph({
              children: [
                new TextRun({
                  text: profile.summary,
                  size: 20
                })
              ],
              spacing: { after: 400 }
            })
          ] : []),

          // Опыт работы
          ...(profile.experience && profile.experience.length > 0 ? [
            new Paragraph({
              children: [
                new TextRun({
                  text: "ОПЫТ РАБОТЫ",
                  bold: true,
                  size: 24,
                  color: "156dcf"
                })
              ],
              heading: HeadingLevel.HEADING_2,
              spacing: { before: 400, after: 200 }
            }),
            ...profile.experience.flatMap(exp => [
              new Paragraph({
                children: [
                  new TextRun({
                    text: exp.position,
                    bold: true,
                    size: 22
                  })
                ],
                spacing: { before: 200, after: 100 }
              }),
              new Paragraph({
                children: [
                  new TextRun({
                    text: `${exp.company} • ${exp.location}`,
                    size: 20,
                    color: "156dcf"
                  })
                ],
                spacing: { after: 100 }
              }),
              new Paragraph({
                children: [
                  new TextRun({
                    text: `${exp.startDate} - ${exp.current ? 'настоящее время' : exp.endDate}`,
                    size: 18,
                    color: "666666"
                  })
                ],
                spacing: { after: 200 }
              }),
              ...exp.description.map(desc => 
                new Paragraph({
                  children: [
                    new TextRun({
                      text: `• ${desc}`,
                      size: 20
                    })
                  ],
                  spacing: { after: 100 }
                })
              )
            ])
          ] : []),

          // Образование
          ...(profile.education && profile.education.length > 0 ? [
            new Paragraph({
              children: [
                new TextRun({
                  text: "ОБРАЗОВАНИЕ",
                  bold: true,
                  size: 24,
                  color: "156dcf"
                })
              ],
              heading: HeadingLevel.HEADING_2,
              spacing: { before: 400, after: 200 }
            }),
            ...profile.education.flatMap(edu => [
              new Paragraph({
                children: [
                  new TextRun({
                    text: `${edu.degree} - ${edu.field}`,
                    bold: true,
                    size: 22
                  })
                ],
                spacing: { before: 200, after: 100 }
              }),
              new Paragraph({
                children: [
                  new TextRun({
                    text: edu.institution,
                    size: 20,
                    color: "156dcf"
                  })
                ],
                spacing: { after: 100 }
              }),
              new Paragraph({
                children: [
                  new TextRun({
                    text: `${edu.startYear} - ${edu.endYear}`,
                    size: 18,
                    color: "666666"
                  }),
                  ...(edu.gpa ? [
                    new TextRun({
                      text: ` | Средний балл: ${edu.gpa}`,
                      size: 18,
                      color: "666666"
                    })
                  ] : [])
                ],
                spacing: { after: 200 }
              })
            ])
          ] : []),

          // Навыки
          ...(profile.skills && profile.skills.length > 0 ? [
            new Paragraph({
              children: [
                new TextRun({
                  text: "НАВЫКИ",
                  bold: true,
                  size: 24,
                  color: "156dcf"
                })
              ],
              heading: HeadingLevel.HEADING_2,
              spacing: { before: 400, after: 200 }
            }),
            new Paragraph({
              children: [
                new TextRun({
                  text: profile.skills.map(skill => `${skill.name} (${skill.level})`).join(' • '),
                  size: 20
                })
              ],
              spacing: { after: 400 }
            })
          ] : []),

          // Социальные сети
          ...((profile.linkedin || profile.github || profile.website) ? [
            new Paragraph({
              children: [
                new TextRun({
                  text: "ССЫЛКИ",
                  bold: true,
                  size: 24,
                  color: "156dcf"
                })
              ],
              heading: HeadingLevel.HEADING_2,
              spacing: { before: 400, after: 200 }
            }),
            new Paragraph({
              children: [
                ...(profile.linkedin ? [
                  new TextRun({
                    text: `LinkedIn: ${profile.linkedin}`,
                    size: 20
                  })
                ] : []),
                ...(profile.github ? [
                  new TextRun({
                    text: `${profile.linkedin ? ' | ' : ''}GitHub: ${profile.github}`,
                    size: 20
                  })
                ] : []),
                ...(profile.website ? [
                  new TextRun({
                    text: `${(profile.linkedin || profile.github) ? ' | ' : ''}Website: ${profile.website}`,
                    size: 20
                  })
                ] : [])
              ],
              spacing: { after: 400 }
            })
          ] : [])
        ]
      }]
    });

    // Генерируем и сохраняем файл
    const buffer = await Packer.toBuffer(doc);
    const blob = new Blob([buffer], { 
      type: 'application/vnd.openxmlformats-officedocument.wordprocessingml.document' 
    });
    saveAs(blob, filename);
    return true;
  } catch (error) {
    console.error('Ошибка при экспорте в Word:', error);
    throw new Error('Не удалось создать Word файл');
  }
};